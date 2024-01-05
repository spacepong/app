all		:	run

.PHONY	:	run
run		:
			@mkdir -p ~/tmp/data
			@sh ./scripts/run.sh

.PHONY	:	clean
clean	:
			@sh ./scripts/clean.sh db
			@rm -rf ./server/uploads/*.png

.PHONY	:	fclean
fclean	:
			@sh ./scripts/clean.sh all
			@rm -rf ./server/uploads/*.png

.PHONY	:	re
re		:	fclean all
