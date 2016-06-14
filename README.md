# mah-propp.github.io

## Lägga till nytt material

* I `_data/material.yml` placeras en lista över allt tillgängligt material. I denna filen ser ni även formatet på hur det ska skrivas
* I `_data/quiz/` placeras filer för respektive Quiz innehållande de rätta svaren. Ta en titt på den nuvarande filen för att se i vilket format det ska skrivas
* I `_includes/quiz/` placeras självaste Quizzen med alla frågor
    * Varje fråga är separeras med hjälp av rubriknivå 3 `### Fråga 1` osv.
    * Klassen "alternatives" markerar listan som innehåller alternativ, `{: .alternatives}` efter en lista
* I `material/` placeras allt material (innehållet) i form av markdownfiler
    * Varje fil har metadata i form av: `id` (vilket material), `title` (sidtitel), `layout` (alltid "material"), `quiz` (vilken quiz materialet ska ha) och en list `link` innehållande externa länkar (där ni fyller i `title` samt `url`)
    * Bilder kan placeras i mappen `images` och sedan länkas in relativt från materialfilerna med `images/...`
    * I filen `example.md` finner ni en massa exempel på hur markdown kan skrivas
* I filen `index.html` i rootmappen hittar ni startsidan

## Git arbetsflöde

``` bash
# Create a new branch
$ git checkout -b my-branch

# do your editing ...

# Add and commit your changes with a message
$ git add .
$ git commit . -m "my message"

# Change to master branch
$ git checkout master
# Fetch most recent updates
$ git pull
# Merge your own changes with the master branch
$ git merge my-branch
# Publish changes to GitHub
$ git push origin master

# (Optional) delete your branch
$ git branch -D my-branch
```

## Installation

``` bash
$ git clone https://github.com/mah-propp/mah-propp.github.io.git
# (ignore if `bundle` is already installed)
$ gem install bundle 
# Install dependencies
$ bundle install    # ruby
# Run a local server for preview
# bundle exec jekyll serve

# (optional) install nodejs dependencies
$ npm install
# (optional) run to compile JS
$ npm run watch
```
