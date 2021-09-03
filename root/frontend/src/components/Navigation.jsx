import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createMuiTheme, MuiThemeProvider, makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchIcon from '@material-ui/icons/Search';
import { grey } from '@material-ui/core/colors';
import '@fontsource/ubuntu/300.css';
import '@fontsource/ubuntu/400.css';
import '@fontsource/ubuntu/500.css';
import '@fontsource/ubuntu/700.css';
import EditableTitle from './board/EditableTitle';
import DrawerList from './DrawerList';

const drawerWidth = 230;

const boardTheme = (theme) => createMuiTheme({
  ...theme,
  typography: {
    fontFamily: 'ubuntu',
    body2: {
      fontSize: '0.9rem',
    },
    button: {
      textTransform: 'none',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    borderBottom: '1px gainsboro solid',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#043927', // Sacramento State green
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  search: {
    position: 'relative',
    border: '1px gainsboro solid',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.grey[400], 0.20),
    '&:hover': {
      backgroundColor: fade(theme.palette.grey[500], 0.20),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.grey[700],
  },
  root: {
    display: 'flex',
    backgroundColor: theme.palette.grey[100],
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    height: '100vh',
    overflow: 'auto',
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const NavigationInterface = ({
  children,
  title,
  filter,
  handleFilterChange,
  handleTitleChange,
  boardFeatures,
  urlID,
}) => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const staticTitle = () => (
    <Typography component="h1" variant="h6" color="inherit" noWrap>
      {title}
    </Typography>
  );

  /* The key prop is necessary so that the component updates when the title prop changes.
   * See https://stackoverflow.com/questions/38892672 */
  const dynamicTitle = () => (
    <EditableTitle
      initialTitle={title}
      key={title}
      TypographyProps={{
        component: 'h1',
        variant: 'h6',
        nowrap: 'true',
      }}
      onSubmit={handleTitleChange}
      cursor="text"
      size="large"
    />
  );

  const search = () => (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Filter cards"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );

  return (
    <MuiThemeProvider theme={boardTheme}>
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
          elevation={0}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            {/* board titles should be editable */}
            {boardFeatures ? dynamicTitle() : staticTitle()}
            {/* the board page requires a search field for filtering tasks */}
            {boardFeatures ? search() : null}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon style={{ color: grey[400] }} />
            </IconButton>
          </div>
          <DrawerList urlID={urlID} />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.appBarSpacer} />
          {children}
        </main>
      </div>
    </MuiThemeProvider>
  );
};

NavigationInterface.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  filter: PropTypes.string,
  handleFilterChange: PropTypes.func,
  handleTitleChange: PropTypes.func,
  boardFeatures: PropTypes.bool,
  urlID: PropTypes.string,
};

NavigationInterface.defaultProps = {
  filter: undefined,
  handleFilterChange: () => {},
  handleTitleChange: () => {},
  boardFeatures: false,
  urlID: undefined,
};

export default NavigationInterface;
