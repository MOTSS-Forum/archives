import glob

with open("README.md", "w") as f:
    f.writelines(["## 微信公众号存档\n", "\n"])
    articles = []
    for html in glob.glob("html/*.html"):
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
        f.writelines(
            ["- [{}](./{}) (_{}_)\n".format(i["title"], i["path"], i["date"])])
