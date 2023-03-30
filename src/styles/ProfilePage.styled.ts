import styled from "styled-components";

const StyledProfilePage = styled.div`
	color: #000;
	margin-top: 3%;

	h2 {
		font-size: 36px;
		font-weight: 400;
	}

	h3 {
		font-size: 24px;
	}

	h4 {
		font-size: 18px;
		font-weight: 300;
	}

	h5 {
		font-size: 13px;
		font-weight: 500;
		color: #bdbdbd;
	}

    p {
        color: #333333;
        font-size: 18px;
        font-weight: 500;
    }

	.profile-details {
		border: 1px solid #e0e0e0;
		border-radius: 12px;

        img {
            width: 72px;
            border-radius: 15px;
        }

		.breaklines {
			border: 1px solid #d3d3d3;
		}

		.link-editprofile {
			p {
				color: #828282;
				font-size: 13px;
				font-weight: 500;
			}

			button {
				border: 1px solid #828282;
				border-radius: 10px;
				padding: 5px 20px;
				font-size: 16px;
				font-weight: 500;
                color: #828282;

                &:hover {
                    opacity: 0.7;
                }
			}
		}
	}



	@media (max-width: 640px) {
        h2 {
            font-size: 24px;
        }
        h4 {
            font-size: 14px;
        }
        p {
            font-size: 16px;
        }
		.profile-details {
			border: none;
		}
        
	}
`;

export default StyledProfilePage;
