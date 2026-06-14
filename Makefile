# Assignmento Makefile

.PHONY: install run build lint deploy clean

# Install dependencies
install:
	npm install

# Run development server
run:
	npm run dev

# Run linting and type checks
lint:
	npm run lint
	npx tsc -b

# Build the project (default output is dist/)
build:
	npm run build

# Prepare production site in /docs for GitHub Pages
deploy: lint
	@echo "Building production site..."
	npm run build
	@echo "Cleaning existing /docs directory..."
	rm -rf docs
	@echo "Moving build output to /docs..."
	mv dist docs
	@echo "Creating .nojekyll to bypass Jekyll processing..."
	touch docs/.nojekyll
	@echo "Successfully prepared production site in /docs"

# Remove build artifacts
clean:
	rm -rf dist docs
