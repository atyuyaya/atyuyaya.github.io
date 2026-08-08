---
title: Blog / Notes
description: "ブログ記事と技術メモの一覧です。"
permalink: /blog/
---

<div class="post-list post-list--full">
  {% for post in site.posts %}
    <article class="post-item">
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p>{{ post.description | default: post.excerpt | strip_html | truncate: 140 }}</p>
      {% if post.tags.size > 0 %}
        <ul class="tag-list" aria-label="タグ">
          {% for tag in post.tags %}
            <li>{{ tag }}</li>
          {% endfor %}
        </ul>
      {% endif %}
    </article>
  {% endfor %}
</div>

