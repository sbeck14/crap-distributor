import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import { ScaleLoader } from 'react-spinners';
import contestants from './contestants.json';

// const contestants = [
//   'Lorraine',
//   'Dave',
//   'Paul',
//   'John',
//   'Jim',
//   'Steve',
// ];

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
    justifyContent: 'space-around', padding: '16px 8px',
  },
  winTextRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  winnerRoot: {
    marginTop: '1vh',
  },
}));

export default function Picker() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([...contestants]);
  const [winner, setWinner] = React.useState('');
  const [checkedHistory, setCheckedHistory] = React.useState(contestants.reduce((acc, cur) => {
    acc[cur] = 0;
    return acc;
  }, {}));
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

  const pick = () => {
    const choice = checked[checked.length * Math.random() | 0]; // eslint-disable-line
    setWaiting(true);
    setTimeout(() => {
      checkedHistory[choice] += 1;
      setCheckedHistory(checkedHistory);
      setWaiting(false);
      setWinner(choice);
    }, (Math.random() + 0.5) * 1000);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h4">
        CrapDistributor v0.1
      </Typography>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <List dense className={classes.listRoot}>
            {contestants.map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              const displayName = (
                <div className={classes.nameRoot}>
                  <span className={classes.winCount}>{checkedHistory[value]}</span>
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
          <Button disabled={checked.length < 2 || waiting} variant="contained" color="primary" onClick={pick}>
            Pick One!
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
    </div>
  );
}
