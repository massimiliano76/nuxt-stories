/* eslint-disable no-console */
import path from 'path'
import test from 'ava'
import NuxtStoriesMod from '@/modules/stories.module'

const srcDir = path.resolve('.')

test('Story routes created ok', (t) => {
  return new Promise((resolve) => {
    const sampleRoutes = []
    const modContainer = {
      extendRoutes(fn) {
        fn(sampleRoutes, path.resolve)
        const storyRoute = sampleRoutes[0]
        console.log('storyRoute', storyRoute)
        t.is(storyRoute.name, '.stories')
        t.is(storyRoute.path, '/.stories')
        t.is(storyRoute.component, path.resolve(srcDir, '.stories/index.vue'))
        t.is(storyRoute.chunkName, '.stories/index')
        t.truthy(storyRoute.children)
        t.true(storyRoute.children.length > 0)
        resolve()
      }
    }
    const simpleNuxt = {
      options: {
        srcDir,
        modules: []
      },
      nuxt: {
        hook(evt, fn) {
          console.log('hook', evt)
          if (evt === 'modules:done') {
            console.log('run hook')
            fn(modContainer)
          }
        }
      },
      registerMod: NuxtStoriesMod
    }
    simpleNuxt.registerMod({ forceBuild: true })
  })
})
