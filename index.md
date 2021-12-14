---
layout: page
title: GFD Viewer
---

<link rel="stylesheet" href="./style.css">

<input type="file" id="importFile" accept=".gfd">

<input type="button" id="submit" class="button" value="분석">

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

<table id="gfdContent">
  <thead>
    <tr>
      <th>Code point</th>
      <th>Tex ID</th>
      <th>Position</th>
      <th>Size</th>
      <th>Advance</th>
      <th>Offset</th>
      <th>Symbol?</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

<script src="./gfd.js"></script>
