import router from './router'


router.beforeEach(async (to, from, next) => {

  // do something

  next()
})

router.afterEach(() => {
  
})