import React, { useState } from 'react';
import styles from '../../styles/scss/components/account/AccountTab.module.scss';

const UserTab = (props) => {
  const { children } = props;
  const [activeTab, setActiveTab] = useState(children[0].props.index || 0);
  const onClickTabItem = (index) => setActiveTab(index);

  return (
    <div style={{margin:"0px 10px"}}>
      <div className={styles.userTab}>
        <div className={styles.userTabNav}>
          <ul className={styles.userTabMenu}>
            {children.map((child) => (
              <li
                className={`${styles.userTabItem} ${
                  child.props.index === activeTab ? styles.userTabActive : ''
                }`}
                key={child.props.label}
                role="presentation"
                onClick={() => onClickTabItem(child.props.index)}
              >
                {child.props.label}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.userTabContent}>
          {children.map((child) => {
            if (child.props.index !== activeTab) return null;

            return child.props.children;
          })}
        </div>
      </div>
    </div>
  );
};

export default UserTab;
