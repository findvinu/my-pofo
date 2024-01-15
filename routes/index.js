const data = require("../data");

module.exports.index = (req, res) => {
  // req.session.name = 'Vinod';
  // console.log(req.session);

  // res.send('Server running');
  res.render("index", {
    title: "MyPortfolio - Vinod Yadav",
    layout: "layout",
  });
};

module.exports.projectList = (req, res) => {
  console.log(data.myProjects);
  res.render("project-list", {
    title: "Project Lists",
    navProject: true,
    projects: data.myProjects,
  });
};

module.exports.projectDetail = (req, res) => {
  let alias = req.params.alias;
  let index = data.projectIndex[alias];

  console.log(alias);

  res.render("project-detail", {
    title: "Project Detail",
    navProject: true,
    project: data.myProjects[index],
  });
};

module.exports.blogList = (req, res) => {
  res.render("blogs", {
    title: "Blogs",
    navBlogs: true,
  });
};

module.exports.getLogin = (req, res) => {
  res.render("login", {
    title: "Login",
    layout: "signin-layout",
    navSignin: true,
  });
};

const users = [
  {name:'Vinod Yadav', email: "test@test.com", password: "test" },
  {name:'Hello User', email: "hello@test.com", password: "1234" },
];

module.exports.doLogin = (req, res) => {
  let body = req.body;
  let user = users.filter((ele) => body.email === ele.email)[0];

  if (user && user.password === body.password) {
    console.log(body);
    req.session.user = user;
    res.locals.user = user;
    req.session.isLoggedIn = true;

    res.render("admin/dashboard", {
      title: "Dashboard",
      layout: "layout-admin",
    });
  } else {
    // console.log('User credential not correct');
    res.render("login", {
      title: "Login",
      layout: "signin-layout",
      error: "User credential not correct",
    });
  }
};

module.exports.getSignup = (req, res) => {
  res.render("singup", {
    title: "Create an Account",
    layout: "signin-layout",
  });
};

module.exports.doSignup = (req, res) => {
  let body = req.body;
  console.log(body);
  res.redirect("/login");
};

module.exports.admin = (req, res) => {
  console.log(req.session);
  res.render("admin/dashboard", {
    title: "Dashboard",
    layout: "layout-admin",
  });
};

module.exports.contact = (req, res) => {
  res.render("contact", {
    title: "Contact Us",
    navContact: true,
  });
};

module.exports.doContact = (req, res) => {
  let body = req.body;

  if (body.name == "") {
    res.status(400).json({ message: "Name filed is required" });
  } else {
    res.json({ message: "Contact sumitted successfully" });
  }
};

module.exports.logout = (req, res) => {
  req.session.isLoggedIn = false;
  req.session.user = "";
  res.redirect("/");
};

module.exports.adminProjects = (req,res) =>{
  console.log(data.myProjects);
  res.render('admin/projects',{
    title:'Project List',
    layout: 'layout-admin',
    projects: data.myProjects
  
  })
}

module.exports.adminProjectDetail = (req, res) => {
  let alias = req.params.alias;
  let index = data.projectIndex[alias];

  res.render('admin/projectDetail', {
    title: 'Project Detail',
    layout: 'layout-admin',
    project: data.myProjects[index]
  })
}

module.exports.newProject = (req, res) => {
  res.render('admin/newProject',{
    title: 'New Project',
    layout: 'layout-admin',
  })
}
