TESTS = test/delete.js test/insert.js test/select.js test/update.js
REPORTER = spec
TIMEOUT = 20000
MOCHA_OPTS =

install:
	@npm --registry=http://registry.npm.taobao.org --disturl=http://dist.u.qiniudn.com install

test: install
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov:
	@$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=travis-cov

test-all: test test-cov

test-cov-html:
	@rm -f coverage.html
	@$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=html-cov > coverage.html
	@ls -lh coverage.html

.PHONY: test
