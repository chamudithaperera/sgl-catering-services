ALTER TABLE `contact_details`
  ADD COLUMN `secondary_phone` VARCHAR(191) NOT NULL DEFAULT '',
  ADD COLUMN `tertiary_phone` VARCHAR(191) NOT NULL DEFAULT '';
