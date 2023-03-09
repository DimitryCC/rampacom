import React from 'react';

function ContactForm() {
    const mystyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        margin: '1%',
        padding: '1%',
        height: '80vh',
        justifyContent: 'center',
        border: '15px solid lightgrey',
        borderRadius: '43px 43px 43px 43px',
        backgroundColor: 'lightblue'
    };

    const inputStyle = {
        margin: '5px',
        padding: '5px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: 'white',
        width: '100%',

    };

    const textareaStyle = {
        margin: '5px',
        padding: '5px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: 'white',
        width: '100%',
        height: '200px',
        resize: 'none'
    };

    const buttonStyle = {
        marginTop: '10px',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    };

    const buttonHoverStyle = {
        backgroundColor: '#0069d9'
    };

    function handleSubmit(event) {
        event.preventDefault();
        alert('¡Muchas gracias, enseguida nos pondremos en contacto!');
        window.location.href = '/inici';
    }

    return (
        <div style={mystyle}>
            <h1>Contacta con Nosotros</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <label>Mail de Contacto</label>
                <br />
                <input type={'email'} style={inputStyle} placeholder={'nombre@mail.com'} required/>
                <br />
                <label>Mensaje:</label>
                <br />
                <textarea
                    name="mensaje"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder={'Describenos tu Mensaje'}
                    style={textareaStyle}
                    required
                />
                <br />
                <button
                    type={'submit'}
                    style={buttonStyle}
                    onMouseOver={() =>
                        (buttonStyle.backgroundColor = buttonHoverStyle.backgroundColor)
                    }
                    onMouseOut={() =>
                        (buttonStyle.backgroundColor = '#007bff')
                    }
                >
                    Envia
                </button>
            </form>
        </div>
    );
}

export default ContactForm;
