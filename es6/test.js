function wait(ms) {
   return new Promise(r => setTimeout(r, ms))
}

async function runner() {
   console.log('sắp rồi...')
   await wait(2007)
   console.log('chờ tí...')
   await wait(2012)
   console.log('thêm chút nữa thôi...')
   await wait(2016)
   throw new Error(2016)
}

async function main() {
   try {
     await runner()
     console.log('xong rồi đấy!')
   } catch (e) {
     console.log(`có vấn đề tại ${ e }`)
   }
}

main()
