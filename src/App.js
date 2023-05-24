import logo from './logo.svg';
import './App.css';
import { Box, Card, CardMedia, Container, Grid, Paper, Typography } from '@mui/material'
import { Octokit } from "octokit";
import { useEffect, useState } from 'react';

const octokit = new Octokit({
  // auth: process.env.GH_TOKEN,
});

function App() {
  const [imageNames, setImageNames] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      let files = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'kade-ddnkv',
        repo: 'shitdrawing-img-storage',
        path: 'thumbnail',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
      imageNames.length = 0
      imageNames.push(...files.data.map(file => file.name))
      setIsLoaded(true)
    }
    loadData()
  }, [])

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
      {!isLoaded
        ? 'Loading...'
        : <>
          <div className='background'>
            {/* <div className='blur'> */}
            <Box sx={{ mt: 7, ml: 16 }}>
              <Typography fontSize='2rem' sx={{ zIndex: 1, position: 'relative' }}>■ ╠ ■ хс-с--сссшшс- п-</Typography>
              <Typography fontSize='1rem' sx={{ ml: 6, fontFamily: 'Courier New', zIndex: 1, position: 'relative' }}>dis wos snek</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ ml: 2, width: '160px', height: '400px', backdropFilter: 'blur(6px)', padding: 8 }} />
              <Box sx={{ position: 'fixed', ml: 2, width: '160px', height: '400px', backdropFilter: 'blur(6px)', padding: 8 }}>
                {/* <Box sx={{ width: '100%', height: '100%', backgroundColor: '#fff7fc' }}>
                  </Box> */}
              </Box>
              <Container maxWidth="xl" sx={{mb: 10}}>
                <Box sx={{ mt: 3 }}>
                  <Grid container justifyContent='center' spacing={3}>
                    {[...imageNames].reverse().map(name =>
                      <Grid item>
                        <Card variant="outlined" sx={{ borderRadius: '10px' }}>
                          <CardMedia>
                            <Box sx={{
                              '& img': { transition: 'filter 0.3s ease' },
                              '&:hover img': { filter: 'blur(8px)' }
                            }}>
                              <a href={'https://github.com/kade-ddnkv/shitdrawing-img-storage/blob/main/original/' + name + '?raw=true'} target='blank'>
                                <img
                                  src={'https://github.com/kade-ddnkv/shitdrawing-img-storage/blob/main/thumbnail/' + name + '?raw=true'}
                                />
                              </a>
                            </Box>
                          </CardMedia>
                        </Card>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Container>
            </Box>
            {/* </div> */}
          </div>
        </>
      }
    </div>
  );
}

export default App;
