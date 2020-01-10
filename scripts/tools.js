#!/usr/bin/env node
const fs = require('fs')
const commander = require('commander')
const path = require('path')

const program = new commander.Command()

program.command('generate').action((cmd, env) => {
  console.log(cmd, env)
})

program.parse(process.argv)
