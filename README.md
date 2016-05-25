# catbee-i18n-cli

Wrapper for PyBabel configured for extract translates with catbee-i18n and catbee-i18n-handlebars

# Installation

To work with cli you need global installed python2.7 must install python module [babel](http://babel.pocoo.org/en/latest/installation.html).

And then

``` 
npm install -g catbee-i18n-cli
```

# Usage

in your app directory can run
```
i18n init cs_CZ

i18n extract
i18n update
i18n archive
i18n po2json
```
And now you we have next directories:
```
l10n
├── cs_CZ
│   └── LC_MESSAGES
│       ├── messages.json
│       └── messages.po
```


**i18n** supports the following commands

- `init [locale]` - Init new locale
- `extract [dirs...]` - Extract new phrases for translate
- `update` - Update po files with new extracted phrases
- `archive` - Archive updated .po files to archive with name `po.{branch_name}.zip
- `prepare [dirs...]` - `extract`, `update` and `archive` with one shot 
- `po2json` - Transform .po files to .json for your app

and line options:
- `-d` `--directory` - Directory with translates [l10n]
- `-y` `--young` - Do not remove old translates
- `-a` `--archive-name` - Archive name
- `-c` `--copyright-holder` - Copyright holder
