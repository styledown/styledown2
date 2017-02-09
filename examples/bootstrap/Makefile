styledown := ../../bin/styledown

all: html html.nolayout

html:
	${styledown} *.md -t jade -o html -l layout.ejs --html

html.nolayout:
	${styledown} *.md -t jade -o html.nolayout --html

.PHONY: all html html.nolayout
