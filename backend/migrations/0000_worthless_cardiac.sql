CREATE TYPE "public"."communication_channel" AS ENUM('email', 'sms', 'whatsapp');--> statement-breakpoint
CREATE TYPE "public"."communication_status" AS ENUM('pending', 'sent', 'failed', 'dry_run');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('Pending', 'Paid', 'Overdue', 'Written Off');--> statement-breakpoint
CREATE TYPE "public"."urgency_tier" AS ENUM('stage_1_warm', 'stage_2_firm', 'stage_3_serious', 'stage_4_stern', 'legal_escalation');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'manager', 'viewer');--> statement-breakpoint
CREATE TABLE "communications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"invoice_id" uuid NOT NULL,
	"channel" "communication_channel" NOT NULL,
	"subject" text,
	"body" text,
	"status" "communication_status" DEFAULT 'pending' NOT NULL,
	"sent_at" timestamp with time zone,
	"opened_at" timestamp with time zone,
	"clicked_at" timestamp with time zone,
	"error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"invoice_id" uuid NOT NULL,
	"event_type" text NOT NULL,
	"payload" jsonb,
	"actor" text DEFAULT 'system' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"invoice_no" text NOT NULL,
	"client_name" text NOT NULL,
	"invoice_amount" numeric(14, 2) NOT NULL,
	"due_date" date NOT NULL,
	"contact_email" text NOT NULL,
	"payment_status" "payment_status" DEFAULT 'Pending' NOT NULL,
	"followup_count" integer DEFAULT 0 NOT NULL,
	"last_followup_date" timestamp with time zone,
	"urgency_tier" "urgency_tier",
	"external_ref_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tenants_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" "user_role" DEFAULT 'viewer' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "communications" ADD CONSTRAINT "communications_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "communications_invoice_id_status_sent_at_idx" ON "communications" USING btree ("invoice_id","status","sent_at");--> statement-breakpoint
CREATE INDEX "events_invoice_id_created_at_idx" ON "events" USING btree ("invoice_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "invoices_invoice_no_tenant_id_uniq" ON "invoices" USING btree ("invoice_no","tenant_id");--> statement-breakpoint
CREATE INDEX "invoices_tenant_id_payment_status_idx" ON "invoices" USING btree ("tenant_id","payment_status");--> statement-breakpoint
CREATE INDEX "invoices_external_ref_id_idx" ON "invoices" USING btree ("external_ref_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_tenant_id_uniq" ON "users" USING btree ("email","tenant_id");