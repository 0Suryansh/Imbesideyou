export const toastStyle = {
    success: {
        style: {
            height: "70px",
            padding: '16px',
            color: '#FFFFFF',
            background: "#66BB6A",
        },
        iconTheme: {
            primary: '#66BB6A',
            secondary: '#FFFAEE',
        },
    },
    error: {
        style: {
            height: "70px",
            padding: '16px',
            color: '#FFFFFF',
            background: "#E57373",
        },
        iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
        },
    }
}
export const isValidEmail = (email) => {
    return String(email)
      .toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};