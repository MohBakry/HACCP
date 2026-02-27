import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Card, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import TextInput from '../../shared/formComponents/TextInput';
import { getPublishedCourseDetails } from '../../Redux/courses/courses.service';
import { useToast } from '../../shared/toast/useToast';
import LoadingSpinner from '../../shared/LoadingSpinner';
import axiosClient from '../../config/axiosClient';
import styles from './styles.module.css';

// Payment validation schema
const validationSchema = Yup.object({
  cardName: Yup.string()
    .required('Cardholder name is required')
    .min(3, 'Name must be at least 3 characters'),
  cardNumber: Yup.string()
    .required('Card number is required')
    .matches(/^[0-9]{16}$/, 'Card number must be 16 digits'),
  expiryDate: Yup.string()
    .required('Expiry date is required')
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Format must be MM/YY'),
  cvv: Yup.string()
    .required('CVV is required')
    .matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits'),
  billingAddress: Yup.string()
    .required('Billing address is required')
    .min(10, 'Address must be at least 10 characters'),
  city: Yup.string().required('City is required'),
  zipCode: Yup.string()
    .required('ZIP code is required')
    .matches(/^[0-9]{5}$/, 'ZIP code must be 5 digits'),
});

export default function Payment() {
  const { courseId, groupId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();
  const [processing, setProcessing] = useState(false);

  const { courseDetails, loading } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (courseId) {
      dispatch(getPublishedCourseDetails(courseId));
    }
  }, [courseId, dispatch]);

  if (loading.getPublishedCourseDetails) {
    return <LoadingSpinner />;
  }

  if (!courseDetails) {
    return (
      <Container className="py-5">
        <div className="text-center">Course not found.</div>
      </Container>
    );
  }

  const selectedGroup = courseDetails.groups?.find((g) => g._id === groupId);

  if (!selectedGroup) {
    return (
      <Container className="py-5">
        <div className="text-center">Group not found.</div>
      </Container>
    );
  }

  const originalPrice = courseDetails.price;
  const discountAmount = (originalPrice * selectedGroup.discount) / 100;
  const finalPrice = originalPrice - discountAmount;

  const initialValues = {
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zipCode: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setProcessing(true);
    try {
      if (!user || !user.id) {
        throw new Error('User not authenticated');
      }

      const paymentPayload = {
        courseId,
        groupId,
        userId: user.id,
        billingInfo: {
          cardHolderName: values.cardName,
          cardNumber: values.cardNumber,
          address: values.billingAddress,
          city: values.city,
          zipCode: values.zipCode,
        },
      };

      const response = await axiosClient.post(
        '/payments/create',
        paymentPayload
      );

      if (
        response.data.success ||
        response.status === 200 ||
        response.status === 201
      ) {
        showSuccess('Payment successful! You are now enrolled in the course.');

        // Navigate to enrolled courses or course content
        //   setTimeout(() => {
        navigate(`/profile/my-courses`);
        //   }, 1500);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Payment failed. Please try again.';
      showError(`Payment failed: ${errorMessage}`);
    } finally {
      setProcessing(false);
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <div className="mb-4">
        <Button
          variant="link"
          className="p-0"
          onClick={() => navigate(`/checkout/${courseId}/${groupId}`)}
        >
          <i className="fa fa-arrow-left me-2"></i>Back to Checkout
        </Button>
      </div>

      <h2 className="mb-4">Payment</h2>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <i className="fa fa-credit-card me-2"></i>Payment Information
              </h5>
            </Card.Header>
            <Card.Body>
              <Alert variant="info" className="mb-4">
                <i className="fa fa-info-circle me-2"></i>
                All transactions are secure and encrypted.
              </Alert>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, isValid, dirty }) => (
                  <Form>
                    <TextInput
                      name="cardName"
                      label="Cardholder Name"
                      placeholder="John Doe"
                      required
                    />

                    <TextInput
                      name="cardNumber"
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      maxLength="16"
                      required
                    />

                    <Row>
                      <Col md={6}>
                        <TextInput
                          name="expiryDate"
                          label="Expiry Date"
                          placeholder="MM/YY"
                          maxLength="5"
                          required
                        />
                      </Col>
                      <Col md={6}>
                        <TextInput
                          name="cvv"
                          label="CVV"
                          placeholder="123"
                          maxLength="4"
                          required
                        />
                      </Col>
                    </Row>

                    <h6 className="mt-4 mb-3">Billing Address</h6>

                    <TextInput
                      name="billingAddress"
                      label="Address"
                      placeholder="123 Main Street"
                      required
                    />

                    <Row>
                      <Col md={6}>
                        <TextInput
                          name="city"
                          label="City"
                          placeholder="New York"
                          required
                        />
                      </Col>
                      <Col md={6}>
                        <TextInput
                          name="zipCode"
                          label="ZIP Code"
                          placeholder="12345"
                          maxLength="5"
                          required
                        />
                      </Col>
                    </Row>

                    <div className="d-flex justify-content-end gap-2 mt-4">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          navigate(`/checkout/${courseId}/${groupId}`)
                        }
                        disabled={isSubmitting || processing}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="success"
                        disabled={
                          isSubmitting || processing || !isValid || !dirty
                        }
                      >
                        {processing ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <i className="fa fa-check me-2"></i>
                            Submit Payment
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Order Summary */}
          <Card className={styles.summaryCard}>
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <h6>{courseDetails.title}</h6>
                <small className="text-muted">
                  Group: {selectedGroup.name || 'Default Group'}
                </small>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Course Price:</span>
                <span>${originalPrice.toFixed(2)}</span>
              </div>
              {selectedGroup.discount > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Discount ({selectedGroup.discount}%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary h4">
                  ${finalPrice.toFixed(2)}
                </strong>
              </div>

              <div className="mt-4 p-3 bg-light rounded">
                <small className="text-muted">
                  <i className="fa fa-shield-alt me-2"></i>
                  Your payment information is secure and protected.
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
