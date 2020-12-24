# Table Top Simulator Mod for Star Wars: Legion

This project is a community-contributed open source mod for
[Table Top Simulator][1], emulating some features and gameplay of
[Star Wars Legion][2]. It is periodically updated to the [Steam Workshop][3],
and in the future we will have a documented release schedule and policy as part of the [Wiki][4].

_Star Wars: Legion and all related properties and text are owned by Fantasy
Flight Games, Lucasfilm Ltd., and/or Disney._

## Background

The TTS SWL Mod was created and is maintained by one person, [Tieren][5], but
as the anticipated future workload will grow beyond the reasonable capabilities
of a single person and to ensure Tierens future commitment and enjoyment in
contributing to the mod, the aim of this project will be to move the mod to open
source and allow the community to contribute to the continued development of the
mod.

## Getting Started

[Download Node.js][1] and then setup the development tools:

```sh
npm install
```

[1]: https://nodejs.org/en/download/

You can then build and start Tabletop Simulator automatically:

```sh
npm start
```

It is highly recommended to install and use the [Atom Editor][2] with the
official [Tabletop Simulator plugin][3] at this time. You can make edits,
and then when you are ready save over the generated file:

![Example](https://user-images.githubusercontent.com/168174/81742133-78055300-9454-11ea-8fc7-8162c9e8898e.png)

Upon closing Tabletop Simulator, the files in `mod` will be updated
automatically.

[2]: https://atom.io/
[3]: https://atom.io/packages/tabletopsimulator-lua

## Advanced users

If you are feeling up to it, or don't develop on Windows:

```sh
# Builds dist/StarWarsLegion.json
$ npm run build

# Creates a link from dist/ to the provided directory (your TTS/Saves directory).
#
# See: https://www.pcgamingwiki.com/wiki/Tabletop_Simulator
#
#   macOS (OS X) ~/Library/Tabletop Simulator/
#   Linux ~/.local/share/Tabletop Simulator/
$ npm run link -- "~/path/to/saves/dir"

# Runs the local asset server
$ npm run serve
```

You can now load up Tabletop Simulator manually, and open
`TTSDevLink/StarWarsLegion`. When you are done making any changes to this save
file, you can run the command:

```sh
npm run extract
```

... to reflect the changes into the `mod/` folder.
