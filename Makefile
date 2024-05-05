.PHONY: build
build:
	bun run script/build.ts

.PHONY: dev
dev:
	bun run script/dev.ts

deploy: build
	bun x @cubing/deploy

.PHONY: clean
clean:
	rm -rf ./dist/
