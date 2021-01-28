import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { DetailProps } from './typing';

const ErrorBoundaryReporter: React.FC<DetailProps> = ({
  baseBackupUrl,
  fallbackComponent,
  isAutoJump = true,
  project,
  children
}) => {
  return (
    <ErrorBoundary
      FallbackComponent={() => {
        if (fallbackComponent) return fallbackComponent;
        return (
          <div
            style={{
              marginTop: 100,
              display: 'block',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 500
            }}
          >
            🌋系统发生不期望的错误,错误已经上报,请暂时使用
            <a href={`${baseBackupUrl}/${window.location.hash}`}>备用地址</a>访问,我们会尽快恢复~🏕
          </div>
        );
      }}
      onError={(error, info) => {
        if (window.location.hostname !== 'localhost') {
          if (baseBackupUrl && isAutoJump) {
            window.open(`${baseBackupUrl}/${window.location.hash}`, '_self');
          }
          window.fetch('http://ops.test.ximalaya.com/rigel/api/issueReport', {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
              'user-agent': 'Mozilla/4.0 MDN Example',
              'content-type': 'application/json'
            }),
            body: JSON.stringify({
              error: error.toLocaleString(),
              info,
              location: window.location,
              project: project || 'default',
              level: 'error'
            })
          });
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryReporter;
