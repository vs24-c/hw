class MainController {
  static mainPage(req, res) {
    res.render('index', {
      title: 'Home Page',
    });
  }
}

export default MainController;
