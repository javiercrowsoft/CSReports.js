CSReports.js
=============

Welcome

CSReports.js is a report editor tool that allows you to create reports from data in SQL Server, PostgreSQL, Oracle and MySQL in the browser. 100 % vanilla TypeScript. Using Canvas html to do al the drawing and Web Workers for report processing.

![orden_de_pago](https://github.com/javiercrowsoft/CSReports.js/assets/1075455/7bb5c7d4-0775-4b6c-9d90-eea2555268a7)

The datasource can be a SQL select statement or an stored procedure. A report can contain many datasources.

It is written in TypeScript.

It runs in a browser.

It supports multiple headers, footers and groups.

Sections can contain subsections.

You can create formulas to define the value of controls and the visibility of controls, sections and subsections.

Formulas can be written in JavaScript.

It supports images embedded in the report or from the database.

It can export to PDF.

The datasource can be a JSON file, so it can run disconnected from a database as a client preview tool that consume
reports from a web application.

All the controls in the report can be browsed and linked to other reports or web pages.

It is open source and all the code is in Github.

https://github.com/javiercrowsoft/CSReports.js

Copyright (C) 2020 Javier Mariano Alvarez

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

Created by Javier

## Setup

Install TypeScript

npm install typescript --save-dev

npm install -g npx

## To deploy in local

./build.sh

then

./start.sh

## To compile just

tsc

http://www.crowsoft.com.ar

javier at crowsoft.com.ar


## Canvas Drawing Examples

https://codeburst.io/creating-and-drawing-on-an-html5-canvas-using-javascript-93da75f001c1

### Brush
https://library.superhi.com/posts/how-to-paint-with-code-creating-paintbrushes

## XML
Old csr files ( CSReports report file extension ) has been save using Microsoft XML library. This library store new lines without encoding to & #010;

When the file is parsed by DOMParser the new lines and any other space characters are converted to white space as defined in XML specification.

We need to open those old files and do a search and replace. Search /n and replace by &#010;

https://stackoverflow.com/questions/32529360/newline-characters-not-recognized-in-xml-attribute-value-java-dom-jtextarea