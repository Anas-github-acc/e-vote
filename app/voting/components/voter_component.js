import React, {useState, useEffect} from 'react';
// import personImage from '../person.png'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, TextField } from '@mui/material';
import {getAllCandidate, setVote, votingStarted} from '@/contract/function.js'

function VoterComponent({account, contractInstance}) {
  const [electionId, setElectionId] = useState(1);
  const [totalCandidate, setTotalCandidate] = useState([]);
  const [votingStatus, setVotingStatus] = useState(false);

  useEffect(()=>{ 
    async function connect(){
      const status = await votingStarted(contractInstance, account, electionId);
      if(status.message){
        const arr = await getAllCandidate(contractInstance, account, electionId);
        setTotalCandidate(arr.message)
        setVotingStatus(true)
      }
    }
    setTimeout(connect, 1500);
  },[account, contractInstance, electionId])
  

  async function vote(candidate){
    let result = await setVote(contractInstance, account, electionId, candidate.candidateAddress);
    console.log("result:", result);
  }

  return (
    <div style={{paddingTop: "18px", paddingLeft: "5%",paddingRight: "5%" }}>
      <Card sx={{ maxWidth: 380, float: "left", marginLeft: 8, marginBottom: 8 }} className='!bg-background !text-foreground'>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className='bg-background text-foreground'>
            Election Id: {electionId}
          </Typography>
          <TextField id="outlined-basic" label="Election Id" variant="outlined" style={{width: '100%', marginBottom: '10px'} } 
            onChange={(e)=>setElectionId(e.target.value)}/>
        </CardContent>
      </Card>
        <div className='banner-area'style={{marginBottom: 20}} >
          <h1>WELCOME TO PRESIDENT ELECTION</h1>
        </div>
        <div>
          {
            votingStatus === false ? 
            <>
              <h2>Voting not started yet !!</h2>
            </>
            :
            totalCandidate.map((candidate)=>{
              return(
                <Card sx={{ maxWidth: 380, float: "left", marginLeft: 8, marginBottom: 8 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="340"
                      image={personImage}
                      alt="green iguana"
                      style={{paddingTop: 20}}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {candidate.name} 
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {candidate.age}<br/>
                        {candidate.address}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button variant="contained" onClick={(e)=>vote(candidate)}>Vote</Button>
                  </CardActions>
                </Card>
              )
            })
          } 
        </div>
      </div>
      
  );
}

export default VoterComponent;
