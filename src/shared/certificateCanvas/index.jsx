import React, { forwardRef, useEffect } from 'react';
import logoSrc from '../../assets/images/logo-color.png';

const drawCertificateTemplate = (ctx, width, height, logo) => {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#0d3b66';
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, width - 16, height - 16);

  ctx.strokeStyle = '#83c7d0';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  const cornerSize = 40;
  ctx.fillStyle = '#0d3b66';

  ctx.beginPath();
  ctx.moveTo(35, 35);
  ctx.lineTo(35 + cornerSize, 35);
  ctx.lineTo(35, 35 + cornerSize);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(width - 35, 35);
  ctx.lineTo(width - 35 - cornerSize, 35);
  ctx.lineTo(width - 35, 35 + cornerSize);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(35, height - 35);
  ctx.lineTo(35 + cornerSize, height - 35);
  ctx.lineTo(35, height - 35 - cornerSize);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(width - 35, height - 35);
  ctx.lineTo(width - 35 - cornerSize, height - 35);
  ctx.lineTo(width - 35, height - 35 - cornerSize);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#0d3b66';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(100, 95);
  ctx.lineTo(width - 100, 95);
  ctx.stroke();

  if (logo && logo.width > 0) {
    const logoSize = 140;
    ctx.drawImage(logo, width / 2 - logoSize / 2, 20, logoSize, logoSize / 2);
  } else {
    ctx.fillStyle = '#0d3b66';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('HACCP', width / 2, 60);
    ctx.fillStyle = '#83c7d0';
    ctx.font = '14px Arial';
    ctx.fillText('INSTITUTE NORD', width / 2, 80);
  }

  ctx.fillStyle = '#0d3b66';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('CERTIFICATE OF COMPLETION', width / 2, 170);

  ctx.fillStyle = '#333333';
  ctx.font = '18px Arial';
  ctx.fillText('This certificate is proudly presented to', width / 2, 230);

  ctx.font = '35px Arial';
  ctx.fillText('For successfully completing', width / 2, 400);

  ctx.strokeStyle = '#0d3b66';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(100, height - 140);
  ctx.lineTo(width - 100, height - 140);
  ctx.stroke();

  ctx.fillStyle = '#0d3b66';
  ctx.font = 'bold 16px Arial';
  ctx.fillText('HACCP', width / 2, height - 110);

  ctx.fillStyle = '#83c7d0';
  ctx.font = '12px Arial';
  ctx.fillText('INSTITUTE NORD', width / 2, height - 95);
};

const drawStudentName = (ctx, name, width) => {
  ctx.fillStyle = '#0d3b66';
  ctx.font = 'bold 48px Georgia';
  ctx.textAlign = 'center';
  ctx.fillText(name, width / 2, 300);

  ctx.strokeStyle = '#83c7d0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 280, 320);
  ctx.lineTo(width / 2 + 280, 320);
  ctx.stroke();
};

const drawCourseName = (ctx, courseName, width) => {
  ctx.fillStyle = '#333333';
  ctx.font = '22px Arial';
  ctx.textAlign = 'center';

  const displayName =
    courseName.length > 50 ? `${courseName.substring(0, 50)}...` : courseName;

  ctx.fillText(displayName, width / 2, 475);

  ctx.strokeStyle = '#83c7d0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 300, 495);
  ctx.lineTo(width / 2 + 300, 495);
  ctx.stroke();
};

const drawCompletionDate = (ctx, date, width) => {
  ctx.fillStyle = '#666666';
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  ctx.fillText(`Issued on: ${formattedDate}`, width / 2, 530);
};

const drawCertificateId = (ctx, id, height) => {
  ctx.fillStyle = '#999999';
  ctx.font = '12px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(`Certificate ID: ${id}`, 80, height - 80);
};

const CertificateCanvas = forwardRef(function CertificateCanvas(
  {
    studentName = 'Student Name',
    courseName = 'Course',
    completedDate = new Date().toISOString(),
    certificateId,
    className,
    hidden = false,
  },
  ref
) {
  useEffect(() => {
    if (!ref?.current) return;

    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const width = 1200;
    const height = 750;

    canvas.width = width;
    canvas.height = height;

    const logo = new Image();
    logo.crossOrigin = 'anonymous';

    logo.onload = () => {
      drawCertificateTemplate(ctx, width, height, logo);
      drawStudentName(ctx, studentName, width);
      drawCourseName(ctx, courseName, width);
      drawCompletionDate(ctx, completedDate, width);
      if (certificateId) drawCertificateId(ctx, certificateId, height);
    };

    logo.onerror = () => {
      drawCertificateTemplate(ctx, width, height, null);
      drawStudentName(ctx, studentName, width);
      drawCourseName(ctx, courseName, width);
      drawCompletionDate(ctx, completedDate, width);
      if (certificateId) drawCertificateId(ctx, certificateId, height);
    };

    logo.src = logoSrc;
  }, [ref, studentName, courseName, completedDate, certificateId]);

  return (
    <canvas
      ref={ref}
      className={className}
      style={hidden ? { display: 'none' } : undefined}
    />
  );
});

export default CertificateCanvas;
