import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import sequelize from '../instances/db'

import AdminJSSequelize = require('@adminjs/sequelize') // V1
// const AdminJSSequelize = require('@adminjs/sequelize') // V2



AdminJS.registerAdapter(AdminJSSequelize)

const User = sequelize.model('User')

const adminJs = new AdminJS({
  resources: [User],
  branding: {
    companyName: 'AdminJS',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJoAAAAdCAYAAABSSnV3AAAFz0lEQVR4nO1cwW3jOhDVUaYuBDQCAkQkXII7iI6LfAnfHaw7+OzA6iDpIOkg6cDuwOkgPlsG5A78D5IciRyKlKysHK8H4GVFc4bDR87MI7OOc4bMRU5jkaXnjHGTmxglFvvnRGTHXyKfjm3LTa5UHsVulojsmIjsGItsNbY9N7lSiUW2qoBWgi0a26abXJkkYj+vg6xou8+x7brJlUkidp8q0LLjPyITY9t2kyuRWGQpBrKy5XOR07FtvMlIQukwaz8XOU1ElrcA7RiL/fMgykYSz2cLD9jq1PxwtPkQ4MvKDhfC6E/obMwd2MoL7mdoR0rpJOD/FX34UWnAVgT40qV3085GJGL32gayqv1kuoMATyWHrceww/PZomkHzwc7Mdr0SoDBAO5CGHnAcxRgKuDWnQyo0xmm9pPpjksBmmKHZtGHFpNOF8LICmB9/SfTGRZgi4yDXqBcCtCQE+1wCScaCfgGAxQJ2IcHbO0BW/f2H05nmNrPpDsuBWiO4zgT4MIDtibA3rW50sDSBjQvuJ9hAMPyMJfeTQnwlAB7t1auozMSka0Tkb3HIttqTrV0iMn/SbkkoI0hbUDDwmavZB8TjM6IRbZ9FLuZqd/gdAellPjsXwJ8SYC91asjAnxpu+u94H7mAXuq/f6p+q0JaC6ED/V2+vdiBy8JsDcSsBfP579lvVWful7tQlFKdbpMtlQVYeUjErAX2/yuK9AGOWl1dIYu/0pE9o6E0NezDSnFqtIBttLmMpRSbTke8CMB9mYCmvybwi72hOctfFPZouRc9eazhWwqtqiKPzBbfLbQ+YkE7MXo486hk2/OPtU0dMZB33+/wEKofPr1FdtKhwR8g/1el8hKSXdzkQxAw6pDGfitINOEoD5AM9oS8CPx2byLj5ViAPhWB+JegItFFnVN8nVFw1B0hy3QsFPCZhE0QFn3tqGTvU1iuA/QbE58U3JuBJrP5qaN1YmGaaMzdIRsO6G7b91JNuIBW3s+W8g7h/hs7gE/aB1KKZUXgQDfNsJCEXIOiOPWDRvw3fwxAS5cCCMSsFd8Afih6jMBLkx6egGt1EOApy6EEeYXbJy2MTHQaH0lAc6Yv+lC4NcJtdvISb6ZAvleusPzw+fm4n+FT2wXYsc8ultNQAN+kB2KhRc5ZCmABJ7Xv/cGmmQLBupWP1oAzXHKwka3qeonLJJ/Oo5TFQBaOqNRUSYie4pFtoxF9mZJ4qZtk7QVL7ifFVUVX1YNS/Kr/l0oCxKwjy5AIwF7VeyTSEsCfKvoQUJ5/XuvHA2xxWactjGNYZBSOgEudLmbBzxHczfD64xz21l0RxGa+GfrLrIAGgGe6nQU5Kg90CbAladRNuz4twANmde3A03ShQJOfpjwS+RTjM4YtvWjO7CwRoBvq2sPbIKn33YAmgkkNguBnGiKvmsEmuM4Bdcpr4W80WxfZ5zb+tAd8kkmnyRYvnD6JgNNQ39gev4moLn0bno20JC5NVIHPZ3RKAI+ErFf6KrOR7Gb2YTernQHRhQ2OlBKsZBafUavThAH2lSD1ww0jO9TL9UNtwzFWmy0PjS9zohFtrXNr0xVa9Hs6Q5sp52qK0opCdiL+r3pULQSLK+tXAgfdOz+NQONAE89n/92IXwoHjGqPJx8y/LlF56XNymngowE7AXl8qoczQYYXZ/9JMWFe1uu9tmlMFABwPNGpWngi4xEo26cKwaako8aNhm6Dhb+dOnd1JbOUBSapCwsBqM7ZJ5M3TXqsS+PYeR9goIiuAGtairh2hloFY9mk1P1fZpd/SV7G93RZWwUKMAP1WRMC+M45QKjNwDFOEqY/guBJt+aNHT64bOWM2uMIb2hKxP4SNfOuRAv/28O7dixyKKuIPaC+1lJEKaezxb1HMKFMKo37SDFc6N58TCPp8Rnc9048q5WdCAvRcq876uf5mFgq73FM6HW+cjfUWK0bRxKqeezxckP5dWV1m+S/Q0f1nyJ2fE/PKRu/bYUzuMAAAAASUVORK5CYII='
  },
})

const adminRouter = AdminJSExpress.buildRouter(adminJs)

export default adminRouter