import glob
from os import replace
import urllib.parse


def wechat_gen():
    articles = []
    for html in glob.glob("static/wechat/html/*.html"):
        info = html.split("/")[-1].split("_")[1:]
        date = info[0]
        title = info[1].replace('.html', '')
        articles.append({
            "title": title,
            "date": date,
            "path": html
        })

    articles.sort(key=lambda x: x["date"], reverse=True)

    for i in articles:
        with open(f"content/wechat/{i['title']}.md", 'w', encoding='utf8') as f:
            path = urllib.parse.quote(i["path"])[7:]
            pdf_path = path.replace("html", "pdf")
            f.writelines(
                ["---\n",
                 f"title: \"{i['title']}\"\n",
                 f"src: \"{path}\"\n",
                 f"date: {i['date']}\n",
                 f"pdf: \"{pdf_path}\"\n",
                 "---\n"])


if __name__ == '__main__':
    wechat_gen()
