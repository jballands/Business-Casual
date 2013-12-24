#!/usr/bin/env bash

# Check for lessc
val=`which lessc`
if [ ${#val} == 0 ]; then
	printf "\nYou don't have the less compiler on your machine."
	printf "Use 'npm install -g lessc' to get it.\n\n"
	exit 0
fi

# Check for directory
if [ ! -d less ]; then
	mkdir less
	printf "\nYou didn't have a less directory, so I made one for you."
	printf "Please put all your less files into that directory and try again.\n\n"
	exit 0
fi

# Count less files
cd ./less
count=`ls -1 *.less | wc -l`

# Any less files?
if [ $count == 0 ]; then
	printf "\nThere are no less files for me to build. Please write some.\n\n"
	exit 0
fi

# Must have business-casual.less
if [ ! -e ./business-casual.less ]; then
	printf "\nYou must have at least one less file called 'business-casual.less'.\n\n"
	exit 0
fi

printf "\n%d LESS file(s) found." $count

printf "\nStarting build...\n\n"

cd ..
if [ ! -d css ]; then
	mkdir css
fi
cd ./less

# Build
lessc ./business-casual.less > ../css/business-casual.css

#find . -type f -iname "*.less" -print0 | while IFS= read -r -d $'\0' line; do
	#filename=$(basename "$line")
	#extension="${filename##*.}"
	#filename="${filename%.*}"

	#lessc "$line" > "../css/${filename}.css"

	#printf "Made %s\n" "${filename}.css"
#done

printf "Done.\n\n"