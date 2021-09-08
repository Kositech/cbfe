import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { Row, Col, Form, Button } from 'react-bootstrap'
import variable from '../helpers/variable'
import ViewContent from '../components/view-content'
import ViewWrapper from '../components/view-wrapper'
import FullPageBg from '../components/full-page-bg'
import bg from '../assets/bg01.png'

function Login(props) {
    const { t } = useTranslation();

    return (
        <ViewWrapper>
            <FullPageBg url={bg} />
            <div className="login-header">
                <Row>
                    <Col sm={12} md={4}>
                        <div className="logo mt-3 ml-4"></div>
                    </Col>
                    <Col sm={12} md={8} className="d-flex justify-content-end">
                        <div className="slogan mt-3 mr-4"></div>
                    </Col>
                </Row>
            </div>
            <div className="login-content">
                <Row>
                    <Col sm={12} md={12} lg={6} className="d-flex justify-content-center align-items-center flex-column">
                        <div className="text-start bold fst-italic font-xl drop-shadow white lh-1 slogan-text1">
                            {t('Welcome_to')}
                            <div className="text-start font-70 bold fst-italic drop-shadow white lh-1 pb-4 mt-1 slogan-text2">
                                {t('Crystal_Ball')}
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={12} lg={6} className="d-flex justify-content-center align-items-center flex-column">
                        <div className="login-box py-3 px-4">
                            <Form>
                                <ViewContent
                                    css="d-flex justify-content-end align-items-center dark-green mb-2"
                                >
                                    {
                                        variable.LANGUAGE.map(function (v, i) {
                                            return (
                                                <div className="language-box text-center"
                                                    onClick={() => {

                                                    }}>
                                                    {v.name}
                                                </div>
                                            )
                                        })
                                    }
                                </ViewContent>
                                <ViewContent
                                    css="d-flex justify-content-start align-items-start mb-4 flex-column"
                                >
                                    <div className="bold font-36 dark lh-1-5 fst-italic">{t('Sign_In')}</div>
                                    <div className="bold fst-italic font-xm dark" style={{ opacity: "0.4" }}>{t('with_email')}</div>
                                </ViewContent>
                                <ViewContent
                                >
                                    <Form.Group className="mb-2" controlId="formEmail">
                                        <Form.Control type="email" placeholder={t('form.Email')} className="mb-3" />
                                        <Form.Control type="password" placeholder={t('form.Password')} />
                                    </Form.Group>
                                </ViewContent>
                                <ViewContent
                                    css="d-flex justify-content-between align-items-center mt-1"
                                >
                                    <div className="bold fst-italic dark text-start">{t('Forgot_your_password?')}</div>
                                    <div className="bold fst-italic dark text-end">{t('Need_support?')}</div>
                                </ViewContent>
                                <ViewContent>
                                    <Form.Group className="mb-4 mt-3" controlId="formCheckBox">
                                        <Form.Check type="checkbox" label={t('Stay_Signed_In')} />
                                    </Form.Group>
                                </ViewContent>
                                <ViewContent
                                    css="d-flex justify-content-start align-items-center mb-5 pb-2"
                                >
                                    <Button size="lg" className="font-l style-btn white bg-green bold fst-italic w-100">
                                        {t('Sign_In')}
                                    </Button>
                                </ViewContent>
                                <ViewContent
                                    css="d-flex justify-content-start align-items-start pt-1 flex-column"
                                >
                                    <div className="bold fst-italic dark text-start mb-3">{t('Or_Sign_In_with_Single_Sign_On')}</div>
                                    <div className="sso-logo-wrap">
                                        <div className="sso-logo m-2"
                                            onClick={() => { }}
                                        >

                                        </div>
                                    </div>
                                </ViewContent>
                            </Form>
                        </div>
                        <ViewContent
                            css="d-flex justify-content-between align-items-start download-wrap mt-3"
                        >
                            {
                                variable.DOWNLOAD_LINK.map(function (v, i) {
                                    return (
                                        <div className={v.className} onClick={() => { }}>
                                        </div>
                                    )
                                })
                            }
                        </ViewContent>
                    </Col>
                </Row>
            </div>
        </ViewWrapper>
    )
}

export default Login