all		:	run

.PHONY	:	run
run		:
			sh ./scripts/run.sh
.PHONY	:	clean
clean	:
			sh ./scripts/clean.sh db

.PHONY	:	fclean
fclean	:
			sh ./scripts/clean.sh all

.PHONY	:	re
re		:	fclean all
