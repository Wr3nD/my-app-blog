import React, { useEffect, useState } from "react";
import { GoBell } from "react-icons/go";
import styled from "styled-components";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { api, apiGetNotifications } from "../action";
import { useNavigate } from "react-router-dom";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        maxHeight: "100vh",
        overflowY: "auto",
    },
};
Modal.setAppElement("#root");
const Bell = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [notificationData, setNotificationData] = useState(null);
    const [send, setSend] = useState(null);

    const admin = useSelector((state) => state.admin);

    const navigate = useNavigate();
    useEffect(() => {
        apiGetNotifications(
            admin.id,
            (data) => {
                setNotificationData(data);
            },
            (err) => console.log(err)
        );
    }, [admin, send]);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    const IsVisited = (ide) => {
        const { userId, articleId, commentsId, id } = notificationData.find(
            (item) => item.id === ide
        );

        api.put(`/notifications/${ide}`, {
            userId,
            visited: true,
            articleId,
            commentsId,
            id,
        })
            .then((data) => {
                console.log(data.data);
                setSend(id);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            {notificationData?.filter((item) => item.visited === false).length >
            0 ? (
                <Box>
                    <GoBell className="box" onClick={openModal} />
                    {
                        notificationData?.filter(
                            (item) => item.visited === false
                        ).length
                    }
                </Box>
            ) : (
                <Box>
                    <GoBell className="box-black" onClick={openModal} />
                </Box>
            )}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h3>byl jste označen v těchto příspěvcích:</h3>
                {admin.user === true
                    ? notificationData?.map((notif) => {
                          const { id, articleId, commentsId, visited } = notif;
                          if (visited) {
                              return (
                                  <Wrapper
                                      key={id}
                                      style={{ border: "1px solid black" }}
                                  >
                                      <h5 style={{ color: "black" }}>
                                          Byl jsi označen v článku {articleId} v
                                          komentáři {commentsId}
                                      </h5>
                                      <h5>
                                          článek zobrazen :{" "}
                                          {visited ? "ano" : "ne"}
                                      </h5>
                                      <button
                                          className="btn"
                                          onClick={() => {
                                              closeModal();
                                              IsVisited(id);
                                              navigate(
                                                  `/articles/${articleId}?_embed=${commentsId}`
                                              );
                                              window.location.reload(true);
                                          }}
                                      >
                                          Find Article
                                      </button>
                                  </Wrapper>
                              );
                          }
                          return (
                              <Wrapper2
                                  key={id}
                                  style={{ border: "1px solid black" }}
                              >
                                  <h5 style={{ color: "red" }}>
                                      Byl jsi označen v článku {articleId} v
                                      komentáři {commentsId}
                                  </h5>
                                  <h5>
                                      článek zobrazen : {visited ? "ano" : "ne"}
                                  </h5>
                                  <button
                                      className="btn"
                                      onClick={() => {
                                          closeModal();
                                          IsVisited(id);
                                          navigate(
                                              `/articles/${articleId}?_embed=${commentsId}`
                                          );
                                          window.location.reload(true);
                                      }}
                                  >
                                      Find Article
                                  </button>
                              </Wrapper2>
                          );
                      })
                    : "pro zobrazení notifikací se musíte přihlásit !!"}
                <button className="btn" onClick={() => closeModal()}>
                    {" "}
                    zavřít
                </button>
            </Modal>
        </>
    );
};
const Box = styled.li`
    .box {
        height: 35px;
        color: red;
        width: 35px;
        margin-left: 2rem;
        cursor: pointer;
    }
    .box-black {
        height: 35px;

        width: 35px;
        margin-left: 2rem;
        cursor: pointer;
        color: black;
    }
`;
const Wrapper2 = styled.div`
    background-color: aliceblue;
    padding: 2rem;
    display: flex;
    margin: 1rem;

    h5 {
        padding: 1rem;
    }
    a {
        margin: 1rem;
    }
`;
const Wrapper = styled.div`
    background-color: grey;
    padding: 2rem;
    display: flex;
    margin: 1rem;

    h5 {
        padding: 1rem;
    }
    a {
        margin: 1rem;
    }
`;
export default Bell;
