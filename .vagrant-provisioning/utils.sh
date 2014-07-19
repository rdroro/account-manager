#!/bin/bash

## Include this file : . ./utils.sh

## Display message ${1} on stdout with [Bootstrap] prefix
function pecho
{
        echo "[Bootstrap] ${1}"
}

## Display message ${1} on stdout with [ERROR] prefix
function perror
{
        echo "[ERROR] ${1}"
}

## Simply wget command where ${1} is an URL
function pwget
{
	wget ${1}
}

## Update package repositories
function pupdate-software
{
        apt-get update > /dev/null
}

## Install application from default package repositories
function pinstall
{
        apt-get install -y ${1} > /dev/null
}