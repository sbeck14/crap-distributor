/* eslint-disable no-plusplus */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton, Typography, CardContent, CardActions, Card,
  Button, Checkbox, ListItemText, ListItemSecondaryAction,
  ListItem, List, Dialog, DialogActions, DialogContent,
  DialogTitle,
} from '@material-ui/core';
import GithubIcon from '@material-ui/icons/GitHub';
import SettingsIcon from '@material-ui/icons/Settings';
import { ScaleLoader } from 'react-spinners';
import contestants from './contestants.json';

const useStyles = makeStyles((theme) => ({
  listRoot: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    minWidth: '300px',
  },
  cardContent: {
    padding: '4px 16px',
  },
  card: {
    width: 'max-content',
  },
  title: {
    margin: '1vh 0',
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
  },
  nameRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  winCount: {
    display: 'inline-block',
    minWidth: '24px',
    marginRight: '6px',
    color: 'grey',
    fontSize: '0.8rem',
  },
  cardActions: {
    justifyContent: 'space-around', padding: '4px 8px 16px',
  },
  winTextRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  winnerRoot: {
    marginTop: '1vh',
  },
  hr: {
    padding: '0',
    margin: '0 auto',
    width: '90%',
    border: '0.5px solid lightgray',
  },
  dialogActions: {
    marginTop: '16px',
  },
  dialogContent: {
    width: '60vw',
    height: '20vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  buttonsContainer: {
    marginBottom: '4px',
  },
}));

export default function Picker() {
  const initCheckedHistory = () => contestants.reduce((acc, cur) => {
    acc.push({ name: cur, count: 0 });
    return acc;
  }, []);

  const getFairModeFromLocalStorage = () => {
    const val = localStorage.getItem('sortaFairMode');
    if (val === null) {
      localStorage.setItem('sortaFairMode', false);
      return false;
    }
    return (val === 'true');
  };
  const getCheckedHistoryFromLocalStorage = () => {
    const val = localStorage.getItem('checkedHistory');
    if (val === null) {
      const ch = initCheckedHistory();
      localStorage.setItem('checkedHistory', JSON.stringify(ch));
      return ch;
    }
    return JSON.parse(val);
  };

  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [sortaFairMode, setSortaFairMode] = React.useState(getFairModeFromLocalStorage());
  const [checked, setChecked] = React.useState([...contestants]);
  const [winner, setWinner] = React.useState('');
  const [checkedHistory, setCheckedHistory] = React.useState(getCheckedHistoryFromLocalStorage);
  const [waiting, setWaiting] = React.useState(false);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleToggleFairMode = () => {
    setSortaFairMode(!sortaFairMode);
    localStorage.setItem('sortaFairMode', (!sortaFairMode).toString());
  };

  const clearHistory = () => {
    const ch = initCheckedHistory();
    localStorage.setItem('checkedHistory', JSON.stringify(ch));
    setCheckedHistory(ch);
  };

  const findInHistory = (contestant) => checkedHistory.find((x) => x.name === contestant);

  const reportChoice = (choice) => {
    setWaiting(true);
    setTimeout(() => {
      findInHistory(choice).count += 1;
      setCheckedHistory(checkedHistory);
      localStorage.setItem('checkedHistory', JSON.stringify(checkedHistory));
      setWaiting(false);
      setWinner(choice);
    }, (Math.random() + 0.5) * 500);
  };

  const pickSortaFair = () => {
    const groups = checkedHistory
    // 1. Get the win history for the selected contestants
      .filter((x) => checked.find((y) => y === x.name))
    /*
        2. Group the selected contestants by how many times they've won
        e.g.:
        [
          { count: 2, members: [ Clagius, Arenar ] },
          { count: 4, members: [ Oritonde, Lydia ] }
        ]
    */
      .reduce((acc, curr) => {
        const found = acc.findIndex((x) => x.count === curr.count);
        if (found === -1) {
          acc.push({ count: curr.count, members: [curr.name] });
        } else {
          acc[found].members.push(curr.name);
        }
        return acc;
      }, []);

    // 3. Sort the groups by how many times they've won (descending)
    groups.sort((a, b) => b.count - a.count);
    const choiceArray = [];
    /*
        4. Loop through the groups. Add each group member to the final array
        i number of times, where i is the index of the group +1
        e.g.:
        [ Clagius, Arenar, Oritonde, Oritonde, Lydia, Lydia ]
    */
    for (let i = 0; i < groups.length; i++) {
      groups[i].members.forEach((member) => {
        for (let j = 0; j <= i; j++) {
          choiceArray.push(member);
        }
      });
    }
    // 5. Pick a random contestant from the array
    const choice = choiceArray[choiceArray.length * Math.random() | 0]; // eslint-disable-line
    reportChoice(choice);
  };

  const pick = () => {
    const choice = checked[checked.length * Math.random() | 0]; // eslint-disable-line
    reportChoice(choice);
  };

  const handlePick = () => {
    if (sortaFairMode) {
      pickSortaFair();
    } else {
      pick();
    }
  };

  const handleSelectAll = () => {
    if (checked.length === contestants.length) {
      setChecked([]);
    } else {
      setChecked([...contestants]);
    }
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h4">
        CrapDistributor v0.2
      </Typography>
      <div className={classes.buttonsContainer}>
        <IconButton onClick={() => window.open('https://github.com/sbeck14/crap-distributor', '_blank')}><GithubIcon /></IconButton>
        <IconButton onClick={handleOpenDialog}><SettingsIcon /></IconButton>
      </div>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <List dense className={classes.listRoot}>
            <ListItem key="select-all">
              <ListItemText primary="Contestants" primaryTypographyProps={{ variant: 'h5' }} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleSelectAll}
                  checked={checked.length === contestants.length}
                  color="primary"
                />
              </ListItemSecondaryAction>
            </ListItem>
            <hr className={classes.hr} />
            {contestants.map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              const displayName = (
                <div className={classes.nameRoot}>
                  <span className={classes.winCount}>{findInHistory(value).count}</span>
                  <span>{value}</span>
                </div>
              );
              return (
                <ListItem key={value} button onClick={handleToggle(value)}>
                  <ListItemText id={labelId} primary={displayName} primaryTypographyProps={{ variant: 'h6' }} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(value)}
                      checked={checked.indexOf(value) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            disabled={checked.length < 2 || waiting}
            variant="contained"
            color="primary"
            onClick={handlePick}
          >
            Pick a winner
          </Button>
          <Button disabled={waiting} color="secondary" onClick={() => { setChecked([]); setWinner(''); }}>
            Clear
          </Button>
        </CardActions>
      </Card>
      <br />
      <div className={classes.winnerRoot}>
        {waiting ? <ScaleLoader /> : winner !== '' ? ( // eslint-disable-line
          <div className={classes.winTextRoot}>
            <Typography variant="h5">
              Winner:
            </Typography>
            <Typography variant="h4">
              {winner}
            </Typography>
          </div>
        ) : null}
      </div>
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle id="form-dialog-title">Settings</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <List>
            <ListItem key="fairMode" button onClick={handleToggleFairMode}>
              <ListItemText id="fairMode" primary='"Fair" Mode' primaryTypographyProps={{ variant: 'subtitle1' }} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggleFairMode}
                  checked={sortaFairMode}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <Button variant="contained" onClick={clearHistory}>Clear Winner History</Button>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
