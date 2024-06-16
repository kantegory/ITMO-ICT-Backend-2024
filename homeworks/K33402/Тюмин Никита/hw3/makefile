install:
	@echo "Installing dependencies..."
	@npm install

build:
	@echo "Building TypeScript files..."
	@mkdir -p $(DIST_DIR)
	@tsc

run: build
	@echo "Starting the server..."
	@node $(DIST_DIR)/index.js

clean:
	@echo "Cleaning up..."
	@rm -rf $(DIST_DIR)

.PHONY: install build run clean