---
layout: page
title: GFD Viewer
---

<link rel="stylesheet" href="./style.css">

# GFD Viewer

A viewer for Game Font Data (GFD) of MT Framework.

<a class="github-button" href="https://github.com/quiple/gfd-viewer" data-size="large" aria-label="View quiple/gfd-viewer on GitHub">View on GitHub</a>

<input type="file" id="importFile" accept=".gfd">

<input type="button" id="submit" class="button" value="Parse">

<dl id="gfdHeader">
  <dt>Version</dt><dd id="version"></dd>
  <dt>Font Size</dt><dd id="fontSize"></dd>
  <dt>Font Texture Count</dt><dd id="fontTexCount"></dd>
  <dt>Character Count</dt><dd id="charCount"></dd>
  <dt>Float Count</dt><dd id="floatCount"></dd>
  <dt>Max Character Width</dt><dd id="maxCharWidth"></dd>
  <dt>Max Character Height</dt><dd id="maxCharHeight"></dd>
  <dt>BaseLine</dt><dd id="baseLine"></dd>
  <dt>DescentLine</dt><dd id="descentLine"></dd>
  <dt>File Name</dt><dd id="fileName"></dd>
</dl>

<input type="file" id="importImgFile" accept=".png" multiple>

<input type="button" id="importImg" class="button" value="Import Font Image">

<table id="gfdContent">
  <thead>
    <tr>
      <th><span>Code point</span></th>
      <th><span>Page</span></th>
      <th><span>Position</span></th>
      <th><span>Size</span></th>
      <th><span>Advance</span></th>
      <th><span>Offset</span></th>
      <th><span>Symbol?</span></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

<script src="./gfd.js"></script>
<script async defer src="https://buttons.github.io/buttons.js"></script>
