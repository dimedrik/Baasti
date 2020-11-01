const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

const Comic = require('./../models/Comic')
const User = require('./../models/User')
const ComicType = require('./../models/ComicType')
const Chapter = require('./../models/Chapter')
const Page = require('./../models/Page')
const LikeComic = require('./../models/LikeComic')
const LikeChapter = require('./../models/LikeChapter')
const UserFavComic = require('./../models/UserFavComic')

AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [
    {
      resource: Comic,
      options: {
        // We'll add this later
      }
    },
    {
        resource: User,
        options: {
          // We'll add this later
        }
    },
    {
        resource: ComicType,
        options: {
          // We'll add this later
        }
    },
    {
        resource: Chapter,
        options: {
          // We'll add this later
        }
    },
    {
        resource: Page,
        options: {
          // We'll add this later
        }
    },
    {
        resource: LikeComic,
        options: {
          // We'll add this later
        }
    },
    {
        resource: LikeChapter,
        options: {
          // We'll add this later
        }
    },
    {
        resource: UserFavComic,
        options: {
          // We'll add this later
        }
    },

  ],
})

// module.exports = adminRouter = AdminBroExpress.buildRouter(adminBro)
module.exports = adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    console.log(email)
    const user = await User.findOne({email: email}).select("+password");
      if (user) {
        const isPasswordMatch = await user.matchPassword(password);
        console.log(isPasswordMatch)
        if (isPasswordMatch && user.role == 'admin') {
          return user
        }
      }
    return false
  },
  cookiePassword: 'session Key',
})