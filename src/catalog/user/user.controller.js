import * as userService from './user.service'
import * as accountService from '../account/account.service'
import * as otpService from '../otp/otp.repository'
import httpStatusCodes from 'http-status-codes'
import moment from 'moment'
import {debug, crypt, generators} from '../../utils'
import {MESSAGE} from '../../constants'

const NAMESPACE = `userController-${moment.utc().toISOString()}`

export const findUserInfoByAccountIdForPartner = async (req, res, next) => {
  try {
    const {id} = req.params

    const accountInstance = await accountService.findAccountById(id)
    if (!accountInstance) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: `Account with id ${id} does not exist.`
      })
    }

    const userInstance = await userService.findUserInfoByAccountIdForPartner(id)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: userInstance
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while finding user by id for partner', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const createUser = async (req, res, next) => {
  try {
    const {email, name, username, phone, password} = req.body

    const userFoundByEmail = await userService.findUserByEmail(email)
    if (userFoundByEmail) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'This email was used.'
      })
    }

    const userFoundByUsername = await userService.findUserByUsername(username)
    if (userFoundByUsername) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'This username was used.'
      })
    }

    const userFoundByPhone = await userService.findUserByPhone(phone)
    if (userFoundByPhone) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'This phone was used.'
      })
    }

    const userInstance = await userService.createUser(email, name, username, phone, password)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: userInstance
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while creating user', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const login = async (req, res, next) => {
  try {
    const {username, password} = req.body

    const userInstance = await userService.authenticateUser(username, password)

    if (!userInstance) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Invalid username or password'
      })
    }

    const token = crypt.createUserAuthToken(userInstance.id)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: userInstance,
      token
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while logging user in', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const findAllAccountsOfUser = async (req, res, next) => {
  try {
    const {id} = req.user

    const accountList = await accountService.findAllAccountsOfUser(id)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: accountList
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while finding all accounts of user', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const generateAndSendOTP = async (req, res, next) => {
  try {
    const {id, name, email} = req.user
    const userID = id

    const otpDigit = generators.generateOTPDigit() // Generate otpDigits
    
    // Find old OTP of user and remove from the DB
    const oldOTP = await otpService.findOTPByUserID(userID)
    
    if (oldOTP) {
      oldOTP.destroy()
    }

    // Save new OTP to DB
    await otpService.createOTP(userID, otpDigit)

    //  Create template for otp email
    const html = generators.generateHTMLEmail(name, otpDigit)

    await userService.sendOTPMail(email, html) // service send email OTP to user email

    //for testing -> replace your email to receive OTP from the server, then you can check your mail box
    //for example: await userService.sendOTPMail('hoangnghia.binhthuan@gmail.com', html)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: req.user,
      msg: `OTP already send to email: ${email}`
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while send OTP to user', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}
