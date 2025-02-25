// 背景图片 Cookies
function setBgImg(bg_img) {
  if (bg_img) {
    Cookies.set("bg_img", JSON.stringify(bg_img), {
      expires: 36500, // 设置 Cookie 过期时间为36500天
    });
    console.log("Bg_img cookie set", bg_img); // 调试输出设置的 Cookies
    return true;
  }
  return false;
}

// 获取背景图片 Cookies
function getBgImg() {
  let bg_img_local = Cookies.get("bg_img");
  try {
    if (bg_img_local && bg_img_local !== "{}") {
      let bg_img = JSON.parse(bg_img_local);
      console.log("Bg_img cookie retrieved", bg_img); // 输出读取到的 Cookies
      return bg_img;
    }
  } catch (e) {
    console.error("Cookies data parsing error", e); // 捕获并输出错误
  }
  // 如果 Cookie 数据出错或不存在，则使用默认设置
  setBgImg(bg_img_preinstall);
  console.log("Bg_img cookie not found or invalid, using default", bg_img_preinstall); // 输出使用默认设置
  return bg_img_preinstall;
}

let bg_img_preinstall = {
  type: "1", // 默认背景
  2: "https://api.dujin.org/bing/1920.php", // 每日一图
  3: "https://api.btstu.cn/sjbz/api.php?lx=fengjing&format=images", // 随机风景
  4: "https://www.dmoe.cc/random.php", // 随机动漫
};

// 更改背景图片
function setBgImgInit() {
  let bg_img = getBgImg();
  console.log("Current bg_img on page load", bg_img); // 输出页面加载时的背景设置
  $("input[name='wallpaper-type'][value=" + bg_img["type"] + "]").click();

  switch (bg_img["type"]) {
    case "1":
      $("#bg").attr(
        "src",
        `./img/background${1 + ~~(Math.random() * 1)}.webp`
      ); // 随机默认壁纸
      break;
    case "2":
      $("#bg").attr("src", bg_img_preinstall[2]); // 必应每日壁纸
      break;
    case "3":
      $("#bg").attr("src", bg_img_preinstall[3]); // 随机风景
      break;
    case "4":
      $("#bg").attr("src", bg_img_preinstall[4]); // 随机动漫
      break;
  }
}

$(document).ready(function () {
  // 壁纸数据加载
  setBgImgInit();

  // 设置背景图片
  $("#wallpaper").on("click", ".set-wallpaper", function () {
    let type = $(this).val();
    let bg_img = getBgImg();
    bg_img["type"] = type;
    console.log("New bg_img set", bg_img); // 输出新设置的背景数据，方便调试

    iziToast.show({
      icon: "fa-solid fa-image",
      timeout: 2500,
      message: "壁纸设置成功，刷新后生效",
    });
    setBgImg(bg_img);
  });
});
