===============
デプロイ - CloudFormation -
===============

作業環境
===============
* Windows 11 Pro
* Visual Studio Code 1.96.2 (Git Bash)
* Git 2.45.0.windows.1
* AWS CLI 2.22.19.0

.. code-block:: bash

  docker compose build
  docker compose up -d


フォーマット変換
================

.. code-block:: bash

  docker compose exec mypython pandoc -f markdown -t html -o md_to_html.html markdown.md
  docker compose exec mypython pandoc -f markdown -t docx -o md_to_docx.docx markdown.md



停止
===============

.. code-block:: bash

  docker compose down


または









===============
RSTの文法
===============

リスト
===============

* 箇条書き
* こうなります

  * インデントを2つ下げると
  * レベルが上がります

* 箇条書き

  * 箇条書き

    * 箇条書き


コード
===============

コードを入力する場合は以下のようなコードブロックを使います．

.. code-block:: python

    def myfunc(a, b, c):
        a = b + c
        print(a)



数式
===============

レンダラによっては :math:`y = f(x)` のようなLaTeX数式も対応しています．インラインだけでなく，行立ての数式

.. math::

    y = \int_a^b f(x, t) dt

も対応しています．
