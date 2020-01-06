import { StyleSheet } from 'react-native'
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    padding: metrics.basePadding * 2,
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  title: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },

  text: {
    textAlign: 'center',
    marginTop: metrics.baseMarging,
    color: colors.light,
    fontSize: 15,
    lineHeight: 21
  },

  error: {
    color: colors.danger,
    textAlign: 'center',
    marginTop: metrics.baseMarging

  },

  form: {
    marginTop: metrics.baseMarging * 2
  },

  input:{
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    height: 44,
    paddingHorizontal: metrics.basePadding
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: metrics.baseRadius,
    height: 44,
    marginTop: metrics.baseMarging,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText:{
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15
  }

});

export default styles;
