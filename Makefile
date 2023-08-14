.PHONY: build
build:
	bun run script/build.ts

.PHONY: dev
dev:
	bun run script/dev.ts

SFTP_PATH      = "towns.dreamhost.com:~/experiments.cubing.net/exponentiation/"
URL            = "https://experiments.cubing.net/exponentiation/"

.PHONY: deploy
deploy: clean build
	rsync -avz \
		--exclude .DS_Store \
		--exclude .git \
		./dist/experiments.cubing.net/exponentiation/ \
		${SFTP_PATH}
	echo "\nDone deploying. Go to ${URL}\n"
