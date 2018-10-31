import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import Grid from '@material-ui/core/Grid'
import { MessageCard } from '@advancedalgos/web-components'
import { withStyles } from '@material-ui/core/styles'

import GET_TEAMS_BY_OWNER from '../../../graphql/teams/GetTeamsByOwnerQuery'

import ManageFBItem from './ManageFBItem'

const styles = theme => ({
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  buttonRight: {
    justifyContent: 'flex-end'
  },
  card: {
    display: 'flex',
    width: '100%'
  },
  cardDetails: {
    display: 'flex',
    flex: 1
  },
  cardContent: {
    flex: 1
  },
  cardMedia: {
    flex: 1,
    width: 100,
    height: 100,
    maxWidth: 100,
    justifyContent: 'flex-start'
  }
})

export const ManageFBList = ({ classes }) => (
  <Query
    query={GET_TEAMS_BY_OWNER}
    fetchPolicy='network-only'
  >
    {({ loading, error, data }) => {
      console.log('GET_TEAMS_BY_OWNER: ', loading, error, data)

      let errors = null
      if (error) {
        errors = error.graphQLErrors.map(({ message }, i) => {
          return <MessageCard message={message} />
        })
      }
      if (!loading && !error) {
        if (data.teams_TeamsByOwner.length > 0) {
          return (
            <React.Fragment>
              <Grid container spacing={40}>
                {!loading &&
                  data.teams_TeamsByOwner.map(team => (
                    <ManageFBItem
                      key={team.id}
                      team={team}
                      classes={classes}
                    />
                  ))}
                {errors}
              </Grid>
            </React.Fragment>
          )
        } else {
          return (
            <Grid container spacing={40}>
              <Grid item xs={12}>
                <MessageCard message='No financial beings yet — Create a team first!' />
                {errors !== null && <MessageCard message={errors} />}
              </Grid>
            </Grid>
          )
        }
      } else {
        return (
          <Grid container spacing={40}>
            <Grid item xs={12}>
              <MessageCard message='Loading...' />
              {errors !== null && <MessageCard message={errors} />}
            </Grid>
          </Grid>
        )
      }
    }}
  </Query>
)

ManageFBList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ManageFBList)
