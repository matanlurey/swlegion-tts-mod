import * as expander from '@matanlurey/tts-expander';
import * as steam from '@matanlurey/tts-runner/steam_finder';
import * as fs from 'fs-extra';
import os from 'os';
import path from 'path';

// Changes the default behavior of unhandled promises.
require('make-promises-safe');

const outputFile = 'StarWarsLegion.json';

/**
 * Builds the mod from `mod/` to `dist/`, returning the tree.
 */
export async function buildToDist(): Promise<expander.SplitSaveState> {
  await fs.remove('dist');
  await fs.mkdirp('dist');
  const source = path.join('mod', outputFile);
  const target = path.join('dist', outputFile);
  const splitter = new expander.SplitIO();
  const saveFile = await splitter.readAndCollapse(source);
  await fs.writeFile(target, JSON.stringify(saveFile, undefined, '  '));
  return expander.splitSave(saveFile);
}

/**
 * Builds the source tree from `dist/` to `mod`/.
 */
export async function extractToMod(): Promise<void> {
  const source = path.join('dist', 'StarWarsLegion.json');
  const target = 'mod';
  await fs.remove('StarWarsLegion*');
  await fs.mkdirp(target);
  const splitter = new expander.SplitIO();
  const modTree = await splitter.readSaveAndSplit(source);
  await splitter.writeSplit(target, modTree);
}

export async function destroySymlink(homeDir?: string): Promise<void> {
  // TODO: Add non-win32 support.
  if (!homeDir) {
    if (os.platform() !== 'win32') {
      throw new Error(`Unsupported platform: ${os.platform()}`);
    }
    homeDir = steam.homeDir.win32(process.env);
  }
  const from = path.join(homeDir, 'Saves', 'TTSDevLink');
  return fs.remove(from);
}

export async function createSymlink(homeDir?: string): Promise<void> {
  // TODO: Add non-win32 support.
  if (!homeDir) {
    if (os.platform() !== 'win32') {
      throw new Error(`Unsupported platform: ${os.platform()}`);
    }
    homeDir = steam.homeDir.win32(process.env);
  }
  await destroySymlink(homeDir);
  const from = path.join(homeDir, 'Saves', 'TTSDevLink');
  return fs.symlink(
    path.resolve('dist'),
    from,
    os.platform() === 'win32' ? 'junction' : 'dir',
  );
}

export async function createAutoExec(): Promise<void> {
  const output = path.join(steam.homeDir.win32(process.env), 'autoexec.cfg');
  await fs.writeFile(
    output,
    [
      // Single-player.
      'host_game 1',

      // Load TTSAutoSave.
      'load TTSDevLink/StarWarsLegion',

      // Close the "Games" window.
      'ui_games_window OFF',
    ].join('\n'),
    'utf-8',
  );
  console.log('Wrote', output);
}

export async function deleteAutoExec(): Promise<void> {
  const output = path.join(steam.homeDir.win32(process.env), 'autoexec.cfg');
  return fs.remove(output);
}