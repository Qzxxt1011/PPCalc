#!/usr/bin/env node

// Created by Mikey Z on 3/12/2022
const NpmApi = require('npm-api')
const json = require('./package.json')
const { exec } = require('child_process')
const chalk = require('chalk')
const inquirer = require('inquirer')
const figlet = require('figlet')
const gradient = require('gradient-string')
const chalka = require('chalk-animation')
const api = new NpmApi
const repo = api.repo('ppcalc')
const pkg = repo.package()
async function getLatest() {
    var json = await pkg
    return json.version
}

function calculate(name) {
    var nameArr = Array.from(name.substring(0,5).toLowerCase())
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'
    var length = 0
    for (let i = 0; i < nameArr.length; i++) {
        length += alphabet.indexOf(nameArr[i])
    }
    return Math.ceil(length/9 * 100) / 100
}

function getVisual(name) {
    var nameArr = Array.from(name.substring(0,5).toLowerCase())
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'
    var length = 0
    for (let i = 0; i < nameArr.length; i++) {
        length += alphabet.indexOf(nameArr[i])
    }
    var realLen = Math.ceil(length/9 * 100) / 100

    var visuals = () => {
        if (realLen > 7.2) {
            return 'Extra Large '+pps.XL
        } else if (realLen > 6) {
            return 'Large '+pps.large
        } else if (realLen > 4.5) {
            return 'Medium '+pps.medium
        } else if (realLen > 3) {
            return 'Small '+pps.small
        } else {
            return 'Extra Small '+pps.XS
        }
    }
    return visuals()
}

getLatest().then((ver) => {
    if (ver != json.version) {
        console.error('OUTDATED VERSION! Updating...')
        exec(`npm i ppcalc@${ver} -g`)
    } else {
        const penisNames = ['penis', 'dick', 'cock', 'big willy', 'willy', 'ding dong', 'pickle', 'thick boi', 'big tickler', 'chicken', 'king kong', 'lemonade dispenser', 'magic wand', 'water gun']
        const pps = {
            XS: '8=D', // 0+
            small: '8==D', // 3+
            medium: '8===D', // 4.5+
            large: '8====D', // 6+
            XL: '8======D' // 7.2+
        }

        console.clear()

        inquirer.prompt({
        name: 'name',
        message: 'What is your name?'
}).then((answer) => {
        var name = answer.name.substring(0,5)
        var nameArr = Array.from(name.toLowerCase())
        var alphabet = 'abcdefghijklmnopqrstuvwxyz'
        var length = 0

        for (let i = 0; i < nameArr.length; i++) {
            length += alphabet.indexOf(nameArr[i])
        }
        console.clear()

        var realLen = Math.ceil(length/9 * 100) / 100

        const anim1 = chalka.rainbow(figlet.textSync(`${answer.name}'s ${penisNames[Math.floor(Math.random() * 13)]} is...`))

        setTimeout(() => {
            const anim2 = chalka.neon(figlet.textSync(`\n${realLen}in\n`))

            var visuals = () => {
            if (realLen > 7.2) {
               return 'Extra Large '+pps.XL
            } else if (realLen > 6) {
                return 'Large '+pps.large
            } else if (realLen > 4.5) {
                return 'Medium '+pps.medium
            } else if (realLen > 3) {
                return 'Small '+pps.small
            } else {
                return 'Extra Small '+pps.XS
            }
        }

        setTimeout(() => {
            let msg = gradient.morning(visuals())
            console.log(msg)
        },5000)
        },1000)
    })
}
})
