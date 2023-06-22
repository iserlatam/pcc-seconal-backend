import app from './src/app.js'

app.listen(process.env.PORT || 8000, () => {
    console.info('Working at port:', process.env.PORT)
});
