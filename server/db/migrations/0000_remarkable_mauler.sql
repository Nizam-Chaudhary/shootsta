CREATE TABLE `ambulances` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`description` text(512),
	`location` text,
	`image_url` text
);
--> statement-breakpoint
CREATE TABLE `doctors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`age` integer NOT NULL,
	`description` text(512),
	`location` text,
	`image_url` text
);
